package com.proof.concepttest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.proof.concept.BackendApplication;

@SpringBootTest(classes=BackendApplication.class)
@ActiveProfiles("test")
class BackendApplicationTests {
	@Test
	void contextLoads() {
	}
}
