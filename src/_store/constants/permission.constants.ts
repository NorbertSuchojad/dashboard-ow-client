export const ADMIN = "ADMIN";
export type ADMIN = typeof ADMIN;

export const MANAGER = "MANAGER";
export type MANAGER = typeof MANAGER;

export const WAITER = "WAITER";
export type WAITER = typeof WAITER;

export const USER = "USER";
export type USER = typeof USER;

export type IPermissionTypes = ADMIN|MANAGER|WAITER|USER;