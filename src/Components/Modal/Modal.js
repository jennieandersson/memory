import React, { useEffect, createRef } from 'react'
import { createPortal } from 'react-dom'
import { ReactComponent as Cross } from '../../images/cross.svg'
import styles from './Modal.module.scss'

const Modal = ({ children, onModalClose }) => {

  useEffect(() => {
    const keyListener = (e) => {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }

    document.addEventListener("keydown", keyListener)

    return () => document.removeEventListener("keydown", keyListener)
  })

  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    )
    const firstElement = focusableModalElements[0]
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1]
    
      if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus()
      return e.preventDefault()
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus()
      e.preventDefault()
    }
  }

  const onClickOutside = e => {
    if (modalRef && modalRef.current.contains(e.target)) return
    onModalClose()
  }

  const modalRef = createRef()
  const keyListenersMap = new Map([[27, onModalClose], [9, handleTabKey]])
  document.querySelector('html').classList.add('scroll-lock')

  return createPortal(
    <div 
      className={styles.modal} 
      role='dialog' 
      aria-modal='true' 
      onClick={onClickOutside}
    >
        <div className={styles.content} ref={modalRef}>
            <div className={styles.header}>
              <button 
                className={styles.closeBtn} 
                title="close modal" 
                onClick={onModalClose}
                aria-label="Close Modal"
              >
                <Cross />
              </button>
            </div>
            {children}
        </div>
    </div>,
    document.body
  )
}

export default Modal
