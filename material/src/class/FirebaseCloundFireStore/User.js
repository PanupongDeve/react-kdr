import Model from "./Model";
import role from "./Role";

class User extends Model {
  constructor() {
    super();
    this.collection = "User";
  }

  async getByUID(UID) {
    try {
      const db = this.createDatabase();
      let data = [];
      const querySnapshot = await db
        .collection(this.collection)
        .where("uid", "==", UID)
        .get();
      querySnapshot.forEach(doc => {
        let Objectdata = {
          documentId: doc.id
        };
        Objectdata = Object.assign(Objectdata, doc.data());
        data.push(Objectdata);
      });
      let user = data[0];
      user = await this.extendUserRole(user);
      return user;
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async extendUsersRole(users) {
    try {
      let usersExtend = users;
      const roles = await role.getAll();

      usersExtend = usersExtend.map(user => {
        roles.forEach(role => {
          if (role.documentId === user.role_documentId) {
            user.role = role;
          }
        });

        return user;
      });

      return usersExtend;
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async extendUserRole(user) {
    try {
      let userExtend = user;
      const roles = await role.getAll();

      roles.forEach(role => {
        if (role.documentId === user.role_documentId) {
          userExtend.role = role;
        }
      });
      return userExtend;
    } catch (error) {
      throw Promise.reject(error);
    }
  }
}

export default new User();
