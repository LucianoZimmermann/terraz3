package com.catolica.terraz.exception;

public abstract class BusinessException extends RuntimeException {
    private final String code;
    protected BusinessException(String code, String message) {
        super(message);
        this.code = code;
    }
    public String code() { return code; }
}
