class CustomOptions {
  constructor() {
    this.handleSuccess = null;
    this.handleError = null;
    this.handleDicitions = null;
    this.setHandle();
    this.messageError = 'ข้อความเก่า';
  }

  setMessageError = (messageError) => {
    this.messageError = messageError
  }

  setHandleError(onConfirm) {
    this.handleError = {
      title: `${this.messageError}`,
      type: "error",
      showConfirmButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'ตกลง',
      onConfirm,
      customClass: 'dk-alert'
    };
  }

  setHandleSuccess(onConfirm) {
    this.handleSuccess = {
      title: "ดำเนินการสำเร็จ",
      type: "success",
      showConfirmButton: true,
      confirmButtonColor: '#A3CB38',
      confirmButtonText: 'ตกลง',
      onConfirm,
      customClass: 'dk-alert'
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
          onConfirm,
          customClass: 'dk-alert'
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
