package com.proof.concepttest.bdd;

public class UserInTest {

    private short status;
    private String name;
    private String email;

    public UserInTest(String email, String name, short status) {
        this.email = email;
        this.name = name;
        this.status = status;
    }

    public short getStatus() {
        return status;
    }

    public void setStatus(short status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
