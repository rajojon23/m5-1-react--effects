import React, { useEffect, useState, useRef }  from "react";
import styled from "styled-components";

export const useKeyDown = (code, callback) =>{
    useEffect(() => {
        function handlekeydownEvent(event) {
          const { key, keyCode } = event;
          if (keyCode === code) {
            
            callback();
    
          }
        }
      
        document.addEventListener('keyup', handlekeydownEvent)
        return () => {
          document.removeEventListener('keyup', handlekeydownEvent)
        }
      }, [])
};

