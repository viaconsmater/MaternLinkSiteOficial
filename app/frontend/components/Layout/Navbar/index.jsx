import {
  ArrowLongRightIcon,
  Bars3Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import { Avatar, Button, Popover, Text } from "@switchdreams/ui";
import React, { useState } from "react";

import { useAlert } from "@/contexts/Alert";
import { imagePath } from "@/utils";

const Navbar = ({ currentUser }) => {
  const { showAlert } = useAlert();
  const { url } = usePage();
  const [open, setOpen] = useState(false);

  const Links = currentUser
    ? [
        {
          name: "Minha agenda",
          href: "/consultas",
          userType: "doctor",
        },
        {
          name: "Rendimento mensal",
          href: "/rendimento",
          userType: "doctor",
        },
        {
          name: "Buscar Profissionais",
          href: "/profissionais",
          userType: "patient",
        },
        {
          name: "Minhas consultas",
          href: "/minhas_consultas",
          userType: "patient",
        },
        {
          name: "Meus Exames",
          href: "/exams/budgets",
          userType: "patient",
        },
        {
          name: "Pedidos Recebidos",
          href: "/clinics/exams/budgets",
          userType: "manager",
        },
        {
          name: "Minha clinica",
          href: "/clinica",
          userType: "manager",
        },
        {
          name: "Meu Perfil",
          href: "/profiles",
          userType: null,
        },
      ]
    : [
        {
          name: "Quem somos",
          href: "#about",
          userType: null,
        },
        {
          name: url === "/home_profissionais" ? "Sou paciente" : "Sou profissional de saúde",
          href: url === "/home_profissionais" ? "/" : "/home_profissionais",
          userType: null,
        },
      ];

  const HeaderLinksDesktop = () => {
    return (
      <>
        <div className=" flex h-8 w-fit flex-none items-center justify-center gap-6 border-r px-10">
          {currentUser ? (
            Links.map((link, idx) => {
              if (link.userType === currentUser.role || link.userType === null) {
                return (
                  <Link href={link.href} key={idx}>
                    <Text className="font-poppins text-sm font-medium text-coolGray-600 opacity-80 duration-500">
                      {link.name}
                    </Text>
                  </Link>
                );
              }
            })
          ) : (
            <>
              <Text
                className="cursor-pointer text-sm font-medium text-coolGray-600 duration-500 hover:text-primary-600"
                onClick={() => (window.location.href = "https://wa.me/61996652148")}
              >
                Contato
              </Text>
              {Links.map((link, idx) => (
                <Link href={link.href} key={idx}>
                  <Text className="text-sm font-medium text-coolGray-600 duration-500 hover:text-primary-600">
                    {link.name}
                  </Text>
                </Link>
              ))}
            </>
          )}
        </div>
        <div className="flex flex-none">
          <div className="flex w-fit flex-none items-center justify-center gap-4">
            {currentUser ? (
              <>
                {/* <div className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-coolGray-300">
                  <BellIcon className="w-4 text-coolGray-800" />
                </div> */}
                <Link href="/profiles">
                  <Avatar
                    avatarUrl={currentUser.image}
                    size="sm"
                    name={currentUser.name}
                    className="border"
                  />
                </Link>
                <Popover
                  position="bottomRight"
                  className="z-40 w-48 rounded-xl rounded-tr-none border border-primary-50 bg-white"
                  button={
                    <ChevronDownIcon className="hidden size-3 stroke-2 text-gray-900 hover:text-gray-700 md:block" />
                  }
                >
                  <div className="flex flex-col gap-2">
                    <Link
                      className="w-full cursor-pointer rounded-lg px-4 py-3"
                      href="/configurations/password"
                    >
                      <Text className="font-poppins text-sm font-medium text-coolGray-600">
                        Configurações
                      </Text>
                    </Link>
                    <Link
                      as="button"
                      className="w-full cursor-pointer rounded-lg px-4 py-3"
                      href="/sign_out"
                      method="delete"
                      onClick={() => {
                        showAlert({
                          message: "O usuário foi deslogado com sucesso",
                          type: "success",
                        });
                      }}
                    >
                      <Text className="font-poppins text-sm font-medium text-error-600">Sair</Text>
                    </Link>
                  </div>
                </Popover>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Text className="text-sm font-medium text-coolGray-600 duration-500 hover:text-primary-600">
                    Entrar
                  </Text>
                </Link>
                <Link href="/sign_up">
                  <Button
                    onClick={() => setOpen(false)}
                    label="Cadastre-se"
                    size="lg"
                    className="flex rounded-2xl bg-primary-500 px-6 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-600"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  const HeaderLinksMobile = () => {
    return (
      <>
        <div className="mb-4 flex w-full flex-col">
          {currentUser ? (
            <>
              {Links.map((link, idx) => {
                if (link.userType === currentUser.role || link.userType === null) {
                  return (
                    <Link
                      href={link.href}
                      className="mt-8 flex w-full justify-between"
                      key={idx}
                      onClick={() => setOpen(false)}
                    >
                      <Text className="font-poppins text-sm font-medium text-coolGray-600 opacity-70 duration-500">
                        {link.name}
                      </Text>
                    </Link>
                  );
                }
              })}
              <Link
                href="configurations/password"
                className="mt-8 flex w-full justify-between"
                onClick={() => setOpen(false)}
              >
                <Text className="font-poppins text-sm font-medium text-coolGray-600 opacity-70 duration-500">
                  Configurações
                </Text>
              </Link>
            </>
          ) : (
            <>
              <div
                className="mt-8 flex w-full justify-between"
                onClick={() => {
                  setOpen(false);
                  window.location.href = `https://wa.me//61996652148`;
                }}
              >
                <Text className="text-sm font-medium text-coolGray-600 duration-500">Contato</Text>
                <ChevronRightIcon className="size-4" />
              </div>
              {Links.map((link, idx) => (
                <Link
                  className="flex w-full appearance-none justify-between"
                  href={link.href}
                  key={idx}
                  onClick={() => setOpen(false)}
                >
                  <div className="mt-8 flex w-full justify-between">
                    <Text className="text-sm font-medium text-coolGray-600 duration-500">
                      {link.name}
                    </Text>
                    <ChevronRightIcon className="size-4" />
                  </div>
                </Link>
              ))}
            </>
          )}
          {!currentUser && (
            <Link
              className="appearence-none mb-1 flex w-full justify-between"
              href="login"
              onClick={() => setOpen(false)}
            >
              <div className="mt-8 flex w-full justify-between">
                <Text className="text-sm font-medium text-coolGray-600 duration-500">Entrar</Text>
                <ChevronRightIcon className="size-4" />
              </div>
            </Link>
          )}
        </div>
        <div className="flex w-full flex-none flex-col">
          {currentUser ? (
            <Link
              as="button"
              className="mt-0 flex w-full justify-between border-t border-coolGray-200 py-6"
              href="/sign_out"
              method="delete"
              onClick={() => {
                showAlert({
                  message: "O usuário foi deslogado com sucesso",
                  type: "success",
                });
              }}
            >
              <Text className="font-poppins text-sm font-medium text-error-600">Sair</Text>
              <ChevronRightIcon className="size-4 text-error-600" />
            </Link>
          ) : (
            <Link href="/sign_up" onClick={() => setOpen(false)}>
              <Button
                label="Cadastre-se"
                onClick={() => setOpen(false)}
                className="flex rounded-2xl bg-primary-500 px-6 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-600"
              />
            </Link>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div className={`fixed top-0 z-40 w-full ${url === "/" && "max-lg:bg-primary-500"}`}>
        {currentUser && !currentUser?.active_plan && (
          <div className="flex flex-col items-center justify-center gap-3 bg-secondary-600 px-6 py-2 md:flex-row md:px-28 lg:h-16 lg:gap-5">
            <div className="flex items-center gap-2">
              <InformationCircleIcon className="size-5 stroke-2 text-coolGray-25" />
              <Text className="text-md font-poppins font-medium text-coolGray-25">
                Vimos que você ainda não possui um plano ativo. Conheça nossos planos e desfrute de
                todos os recursos da plataforma.
              </Text>
            </div>
            <Button
              label="Área de planos"
              iconSide="right"
              icon={ArrowLongRightIcon}
              className="flex w-full rounded-2xl bg-primary-500 px-4 py-5 text-sm font-medium text-white duration-500 hover:bg-primary-600 lg:w-40"
            />
          </div>
        )}
        <div className="flex h-20 items-center justify-between border-b bg-white px-6 md:px-28">
          <div className="h-8 w-40 cursor-pointer">
            {url === "/" ? (
              <>
                <img
                  src={imagePath("LogoDesktop.svg")}
                  className="size-full max-lg:hidden"
                  onClick={() => router.visit("/")}
                  alt="logo"
                />
                <img
                  src={imagePath("LogoDesktop.svg")}
                  className="size-full lg:hidden"
                  onClick={() => router.visit("/")}
                  alt="logo"
                />
              </>
            ) : (
              <img
                src={imagePath("LogoDesktop.svg")}
                className="size-full"
                onClick={() => router.visit("/")}
                alt="logo"
              />
            )}
          </div>
          {currentUser ? (
            <div className="flex items-center justify-center gap-4 lg:hidden">
              <Link href="/profiles">
                <Avatar
                  avatarUrl={currentUser.image}
                  size="sm"
                  name={currentUser.name}
                  className="border"
                />
              </Link>
              <ChevronDownIcon
                className="size-3 cursor-pointer stroke-2 text-coolGray-600 md:block"
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </div>
          ) : (
            <Bars3Icon
              className="size-8 cursor-pointer lg:hidden"
              onClick={() => {
                setOpen(!open);
              }}
            />
          )}
          <div className="flex w-fit items-center justify-between gap-6 max-lg:hidden">
            {HeaderLinksDesktop()}
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 z-20 size-full bg-gray-500 opacity-40 lg:hidden ${
          !open && "hidden"
        }`}
        onClick={() => {
          setOpen(!open);
        }}
      />
      <div
        className={`fixed z-40 mt-20 flex ${open ? "h-80" : "h-0"} w-full flex-col items-center gap-6 overflow-hidden rounded-b-2xl bg-white px-8 duration-500 ease-in-out md:px-28 lg:hidden`}
      >
        {HeaderLinksMobile()}
      </div>
    </>
  );
};

export default Navbar;
