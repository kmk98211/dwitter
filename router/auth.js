/*
회원가입
router.post('/signup',...)  create

로그인
router.post('/login;,...)  
id와 password를 보내준다 포스트로 제이슨으로

로그인까지 하고 깃허브에 올리기

JWT 확인
router.get('/me',...)

*/


import express from "express";
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import {isAuth} from '../middleware/auth.js';

const router=express.Router();

const validateCredential=[
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username은 반드시 입력해야 합니다.'),
    body('password')
        .trim()
        .isLength({min:4})
        .withMessage('password는 반드시 4자 이상이어야 합니다.'),
    validate
];
const validateSignup=[
    ...validateCredential,
    body('name').notEmpty().withMessage('name은 반드시 입력하세요.'),
    body('email').isEmail().withMessage('Email 형식에 맞게 입력하세요.'),
    body('url').isURL().withMessage('URL형식 확인')
        .optional({nullable:true,checkFalsy:true}),
    validate
];


router.post('/signup',validateSignup,authController.signup);
router.post('/login',validateCredential,authController.login);
router.get('/me',isAuth,authController.me);


export default router;