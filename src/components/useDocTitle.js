import React, { useEffect, useState, useRef }  from "react";
import styled from "styled-components";

export const useDocTitle = (title, callback) =>{
    useEffect(() => {
        document.title = title;
    }, [callback]);
};