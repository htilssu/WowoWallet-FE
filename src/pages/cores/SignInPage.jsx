import 'rsuite/dist/rsuite.min.css';
import {Checkbox} from 'rsuite';
import {MantineProvider, PasswordInput, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useState} from 'react';
import {useAuth} from '../../modules/hooks/useAuth.jsx';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {signIn} from '../../modules/auth/auth.js';
import {setCookie} from '../../util/cookieUtil.js';
import {setTitle} from '../../util/titleUtil.js';

const SignInPage = ({registrationLink}) => {
  setTitle("Đăng nhập - WoWoWallet");

  const {
    login,
    isAuthenticate,
  } = useAuth();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm({
    initialValues: {
      userName: '',
      password: '',
      isRemember: false,
    },
    validate: {
      userName: (userN) => {
        if (userN === '') {
          return 'Vui lòng nhập tên đăng nhập';
        }
        return null;
      },
      password: (pass) => {
        if (pass === '') return 'Yêu cầu nhập mật khẩu';
        return null;
      },
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState(null);
  if (isAuthenticate) return <Navigate to={'/home'}/>;

  async function handeLogin() {
    form.validate();

    if (form.isValid) {
      try {
        signIn(form.values)
            .then((res) => {
              if (res.data.user) {
                const data = res.data;
                login(data.user);

                const token = data.token;
                setCookie('token', token);
                navigate('/');
              }
              else {
                setError(res.data.message);
              }
            })
            .catch((res) => {
              if (res.response && res.response.data.message) {
                setError(res.response.data.message);
              }
            });
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      setError(null);
    }
  }

  return (
      <MantineProvider>
        <div className="min-h-screen w-full p-4 overflow-hidden bg-gray-100 text-gray-900 flex justify-center">
          <div
              className="w-full m-0 bg-white rounded-lg overflow-hidden shadow sm:rounded-lg flex justify-center flex-1">
            <div className="flex-1 bg-green-100 text-center hidden sm:flex">
              <div
                  className="w-full bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url("/login_banner.webp")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
              >
                <div
                    className={'w-full h-full opacity-15'}
                    style={{
                      backgroundImage: 'url("/noise.png")',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'repeat-x',
                    }}
                ></div>
              </div>
            </div>
            <div
                className="sm:w-3/5 relative z-10 w-full flex justify-center items-center md:w-1/2 lg:w-5/12 md:p-6 sm:p-12">
              <div className="w-full flex flex-col justify-center items-center">
                <div className={'text-2xl font-bold'}>Đăng nhập</div>
                <div className="w-full px-8 md:px-8 lg:px-20 flex flex-col items-center mt-8">
                  <div className="w-full">
                    <form onSubmit={form.onSubmit(handeLogin)}>
                      <div>
                        <TextInput
                            size={'md'}
                            key={form.key('userName')}
                            placeholder={'Nhập email'}
                            {...form.getInputProps('userName')}
                        />
                      </div>
                      <div className="mt-3">
                        <PasswordInput
                            size={'md'}
                            key={form.key('password')}
                            placeholder={'Nhập mật khẩu'}
                            {...form.getInputProps('password')}
                        />
                      </div>
                      <div>
                        {error && (
                            <div className={'text-sm mt-1'}>
                              <p className={'text-red-400'}>{error}</p>
                            </div>
                        )}
                      </div>
                      <div className="flex mt-1 items-center justify-between ">
                        <div className={'flex justify-center items-center'}>
                          <Checkbox
                              onChange={(_, checked) => {
                                form.setValues({
                                  ...form.getValues,
                                  isRemember: checked,
                                });
                              }}
                              key={form.key('isRemember')}
                          />
                          <span className={'text-sm sm:text-base'}>
                          Giữ đăng nhập
                        </span>
                        </div>
                        <div>
                          <Link
                              className="hover:text-primary hover:no-underline text-sm sm:text-base"
                              to={'/reset-password'}
                          >
                            Quên mật khẩu?
                          </Link>
                        </div>
                      </div>
                      <div className="px-2">
                        <button
                            type={'submit'}
                            className="mt-5 font-semibold bg-primary hover:bg-primaryHover text-white  border border-primary w-full py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        >
                          Đăng nhập
                        </button>
                      </div>
                    </form>
                  </div>
                  <Link
                      to={registrationLink ? registrationLink : '/sign-up'}
                      className={'hover:no-underline hover:text-primary mt-2'}
                  >
                    Tạo tài khoản mới
                  </Link>
                </div>
                <div
                    className={'hidden w-full h-full opacity-15 z-100'}
                    style={{
                      backgroundImage: 'url("/login_banner.webp")',
                    }}
                >
                  <div
                      className={'w-full h-full opacity-100 -z-1'}
                      style={{
                        backgroundImage: 'url("/noise.png")',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'repeat-x',
                      }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MantineProvider>
  );
};

export default SignInPage;
