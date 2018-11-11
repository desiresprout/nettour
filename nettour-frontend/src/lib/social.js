import hello from 'hellojs';

hello.init({
    facebook: 2027355650631434,
    google: '545977447216-94o27pcoqjcedm5bec7cuj21qf7cr1on.apps.googleusercontent.com'
}, {redirect_uri: '/redirect.html'});  //환경 초기화

export default(function () {
    return {
        facebook: () => {
            return new Promise((resolve, reject) => {                
                hello.login('facebook', { scope: 'email' }).then(
                    auth => resolve(auth.authResponse.access_token),
                    e => reject(e)
                );
            })
        },
        google: () => {
            return new Promise((resolve, reject) => {
                hello.login('google', { scope: 'email' }).then(
                    auth => resolve(auth.authResponse.access_token),
                    e => reject(e)
                );
            })
        }
    }
})();