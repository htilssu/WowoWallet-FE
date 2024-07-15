import { Link } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import { Checkbox } from "rsuite";
import { PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { post } from "../../util/requestUtil.js";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";

const LoginForm = ({ imageLink, registrationLink }) => {
  const { setUser } = useAuth();

  const form = useForm({
    initialValues: {
      userName: "",
      password: "",
      isRemember: false,
    },
    validate: {
      userName: (userN) => {
        if (userN === "") {
          return "Vui lòng nhập tên đăng nhập";
        }

        return null;
      },
      password: (pass) => {
        if (pass === "") return "Yêu cầu nhập mật khẩu";
        else return null;
      },
    },
  });

  const [error, setError] = useState("");

  async function handeLogin() {
    form.validate();
    if (form.isValid) {
      post("/v1/auth/login", {
        username: form.values.userName,
        password: form.values.password,
        isRemember: form.values.isRemember,
      })
        .then((res) => {
          const user = JSON.parse(res.data.user);
          setUser(user);
          location.href = "/";
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }

  return (
    <div className="min-h-screen w-full p-4 overflow-hidden bg-gray-100 text-gray-900 flex justify-center">
      <div className="w-full m-0 bg-white rounded-lg overflow-hidden shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-green-100 text-center hidden sm:flex">
          <div
            className="w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/login_banner.webp")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className={"w-full h-full opacity-15"}
              style={{
                backgroundImage: 'url("/noise.png")',
                backgroundSize: "cover",
                backgroundRepeat: "repeat-x",
              }}
            ></div>
          </div>
        </div>
        <div className="sm:w-3/5 relative z-10 w-full flex justify-center items-center md:w-1/2 lg:w-5/12 md:p-6 sm:p-12">
          <div className="w-full flex flex-col justify-center items-center">
            <div className={"text-2xl font-bold"}>Đăng nhập</div>
            <div className="w-full px-8 md:px-8 lg:px-20 flex flex-col items-center mt-8">
              <div className="w-full">
                <form onSubmit={form.onSubmit(handeLogin)}>
                  <div>
                    <TextInput
                      key={form.key("userName")}
                      placeholder={"Nhập email"}
                      {...form.getInputProps("userName")}
                    />
                  </div>
                  <div className="mt-3">
                    <PasswordInput
                      key={form.key("password")}
                      placeholder={"Nhập mật khẩu"}
                      {...form.getInputProps("password")}
                    />
                  </div>
                  <div>
                    {error !== "" && (
                      <div className={"px-2 text-sm mt-1"}>
                        <p className={"text-red-400"}>{error}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex mt-1 items-center justify-between ">
                    <div className={"flex justify-center items-center"}>
                      <Checkbox
                        onChange={(_, checked) => {
                          form.setValues({
                            ...form.getValues,
                            isRemember: checked,
                          });
                        }}
                        key={form.key("isRemember")}
                      />
                      <span className={"text-sm sm:text-base"}>
                        Giữ đăng nhập
                      </span>
                    </div>
                    <div>
                      <Link
                        className="hover:text-primary hover:no-underline text-sm sm:text-base"
                        to="/forgot-password"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                  </div>
                  <div className="px-2">
                    <button
                      type={"submit"}
                      className="mt-5 font-semibold bg-primary hover:bg-primaryHover text-white  border border-primary w-full py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
              <a
                href={registrationLink ? registrationLink : "/register"}
                className={"hover:no-underline hover:text-primary mt-2"}
              >
                Tạo tài khoản mới
              </a>
            </div>
            <div
              className={"hidden w-full h-full opacity-15 z-100"}
              style={{
                backgroundImage: 'url("/login_banner.webp")',
              }}
            >
              <div
                className={"w-full h-full opacity-100 -z-1"}
                style={{
                  backgroundImage: 'url("/noise.png")',
                  backgroundSize: "cover",
                  backgroundRepeat: "repeat-x",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
