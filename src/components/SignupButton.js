import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Disclosure } from "@headlessui/react";

export default function SignupButton() {
  const { loginWithRedirect } = useAuth0();
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <Disclosure.Button
    key={'login'}
    as="a"
    href={'#'}
    className={classNames(
        'text-gray-300 hover:bg-gray-700 hover:text-white',
        'block rounded-md px-3 py-2 text-base font-medium'
    )}
    onClick={() => loginWithRedirect({authorizationParams: {screen_hint: "signup",}}
    )}
    >
    Sign Up
    </Disclosure.Button>
  )
}