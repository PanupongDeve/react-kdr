class CustomOptions {
  constructor() {
    this.handleSuccess = null;
    this.handleError = null;
    this.handleDicitions = null;
    this.setHandle();
  }

  setHandleError(onConfirm) {
    this.handleError = {
      title: "ดำเนินการล้มเหลว โปรดลองใหม่อีกครั้ง",
      type: "error",
      showConfirmButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'ตกลง',
      onConfirm
    };
  }

  setHandleSuccess(onConfirm) {
    this.handleSuccess = {
      title: "ดำเนินการสำเร็จ",
      type: "success",
      showConfirmButton: true,
      confirmButtonColor: '#A3CB38',
      confirmButtonText: 'ตกลง',
      onConfirm
    };
  }

  setHandleDicitions(onConfirm) {
      this.handleDicitions = {
          title: 'แน่ใจหรือไม่?',
          type: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#A3CB38',
          onConfirm
      }
  }

  setOnConfirm(onConfirm) {
    this.setHandleSuccess(onConfirm);
    this.setHandleDicitions(onConfirm);
    this.setHandleError(onConfirm);
  }

  setHandle() {
      this.setHandleSuccess();
      this.setHandleDicitions();
      this.setHandleError();
  }

  getOptions() {
    return this;
  }
}

export default new CustomOptions();
