  
import React, { Component, createContext } from "react";
import { auth, generateUserDocument, generateFavsDocument} from "../firebase";

export const UserContext = createContext({ user: null });
export const UserDistpach = createContext(undefined);

class UserProvider extends Component {
  state = {
    user: null, 
    favs: [],
    loaded: false
  };

  
  
  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      console.log(userAuth)
      const user = await generateUserDocument(userAuth);
      const favs = await generateFavsDocument(userAuth ? userAuth.uid : null)
      await this.setState({ user, loaded: true, favs: favs ? favs.images : [] });
    });
  };
  

  render() {
    const { user, loaded, favs } = this.state;

    return (
      <UserContext.Provider value={{user,loaded, favs}}>
          {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;