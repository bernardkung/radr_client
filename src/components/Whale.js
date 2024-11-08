import React from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import Beluga from './Beluga';
import Blue from './Blue';

export default function Whale() {
  // const { pathMatch } = useMatch();
  // console.log(pathMatch)

  return (
    <>
      <h2>Whale</h2>
      <Routes>
        <Route path={`/blue/*`} element={<Blue />} />
        <Route path={`/beluga/*`} element={<Beluga />} />
      </Routes>
    </>
  );
}