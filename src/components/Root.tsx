import { Outlet } from '@tanstack/react-router';

export const Root = () => {
  return (
    <>
      {/* global/shared navbar or header will go here here */}
      <main>
        <Outlet />
      </main>
      {/* global/shared footer will go here */}
    </>
  );
};
