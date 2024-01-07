import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <>
      <Helmet>
        <title> Sign Up</title>
      </Helmet>

      <RegisterView />
    </>
  );
}
