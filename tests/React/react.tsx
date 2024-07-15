// @ts-nocheck
import threeLevelRelativePath from "../../../threeLevelRelativePath";
import sameLevelRelativePath from "./sameLevelRelativePath";
import thirdParty from "third-party";
export { random } from './random';
import c from 'c';
import oneLevelRelativePath from "../oneLevelRelativePath";
import otherthing from "@core/otherthing";
import a from 'a';
import twoLevelRelativePath from "../../twoLevelRelativePath";
import component from "@ui/hello";
import React, {useEffect, useState, useReducer} from 'react'
import { useNavigate } from 'react-router'
interface ITestComponentProps<T> {
  data: T
}
export const TestComponent = <T extends [],>(props: ITestComponentProps<T>) => {
  return props.data.map((item) => {
    return <div>{item}</div>
  })
}
