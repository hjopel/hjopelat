import { Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import useStore from "./customHooks/useStore";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  cursor: none;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled(Flex)`
  z-index: 500;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  padding: 20px 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
function App({ view }) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     gsap.timeline().to(
  //       ".lateReveal",
  //       {
  //         clipPath: "polygon(0 1%, 100% 0%, 100% 100%, 0% 100%)",
  //         stagger: 0.3,
  //         duration: 2,
  //       },
  //       5000
  //     );
  //   });
  // });

  return (
    <>
      <Flex ref={view} id={"view1"} />
      <Wrapper>
        <Flex className="lateReveal">
          <h1 className="outline">Creative Developer</h1>
          <span>creating memorable sites & experiences</span>
        </Flex>
      </Wrapper>
    </>
  );
}

export default App;
