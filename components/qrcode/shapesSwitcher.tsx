"use client";
import { useContext } from "react";
import { QrStyleContext } from "../provider/qr_provider";
import { CustomButton } from "./details";
const ShapesSwitcher = () => {
  const { state, dispatch } = useContext(QrStyleContext);
  return (
    <>
      <div className={"flex flex-wrap justify-center"}>
        <CustomButton
          title={"Squares"}
          active={state.style === "square"}
          onClick={() =>
            dispatch({
              type: "SET_QR_STYLE",
              payload: { style: "square", dotType: "square" },
            })
          }
        />
        <CustomButton
          title={"Dots"}
          active={state.style === "dot"}
          onClick={() =>
            dispatch({
              type: "SET_QR_STYLE",
              payload: { style: "dot" },
            })
          }
        />
      </div>
      {state.style === "dot" && (
        <div className={"mt-5 flex flex-col justify-center px-1"}>
          <p className={"mb-3"}>
            <span className={"text-xs font-semibold uppercase text-foreground"}>
              Dot Type customizations
            </span>
          </p>
          <div className={"flex flex-wrap gap-y-3"}>
            <CustomButton
              title={"Rounded*"}
              active={state.dotType === "rounded"}
              onClick={() =>
                dispatch({
                  type: "SET_QR_DOT_TYPE",
                  payload: { dotType: "rounded" },
                })
              }
            />
            <CustomButton
              title={"Classy*"}
              active={state.dotType === "classy"}
              onClick={() =>
                dispatch({
                  type: "SET_QR_DOT_TYPE",
                  payload: { dotType: "classy" },
                })
              }
            />
            <CustomButton
              title={"Square"}
              active={state.dotType === "square"}
              onClick={() =>
                dispatch({
                  type: "SET_QR_DOT_TYPE",
                  payload: { dotType: "square" },
                })
              }
            />
          </div>
          <p className={"mt-5 text-xs font-light text-foreground"}>
            * Dot types <strong>&quot;Rounded&quot;</strong> and{" "}
            <strong>&quot;Classy&quot;</strong> can alter the QR code&apos;s
            readability.
          </p>
        </div>
      )}
    </>
  );
};

export default ShapesSwitcher;
