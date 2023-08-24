import React from 'react'
import {Link, redirect, useNavigate, useNavigation} from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div>
      <p>An error has occurred</p>
      <a href="/AutomataMidterm/">Back home</a>
    </div>
  )
}
