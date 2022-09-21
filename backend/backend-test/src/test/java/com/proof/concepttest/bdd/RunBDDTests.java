package com.proof.concepttest.bdd;

import org.junit.runner.RunWith;
import org.springframework.test.annotation.DirtiesContext;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(
    plugin = {"pretty", "html:target/bdd-reports/bdd-reports.html"},
    features = {"classpath:bdd"},
    glue = {"com.proof.concepttest.bdd"})
@DirtiesContext
public class RunBDDTests {
    
}