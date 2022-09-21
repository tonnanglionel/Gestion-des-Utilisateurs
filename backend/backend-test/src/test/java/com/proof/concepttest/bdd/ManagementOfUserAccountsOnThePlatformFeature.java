package com.proof.concepttest.bdd;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import com.proof.concept.BackendApplication;
import com.proof.concept.beans.User;
import com.proof.concept.services.UsersService;
import com.proof.concept.util.Constants;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.DataTableType;
import io.cucumber.java.Scenario;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.spring.CucumberContextConfiguration;

@SpringBootTest(classes=BackendApplication.class, webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@CucumberContextConfiguration
@DirtiesContext
public class ManagementOfUserAccountsOnThePlatformFeature {
    private Scenario scenario;
    private List<User> currentUsersInDb;

    private User foundUser;

    @Autowired
    UsersService usersService;

    @Autowired
	private TestRestTemplate restTemplate;

    @LocalServerPort
	private int port;
    
    @Before
    public void before(Scenario scenario) {
        usersService.deleteAll();
        this.scenario = scenario;
    }

    @After
    public void after() {
        usersService.deleteAll();
    }

    @Given("The following users")
    public void usersAreInMemoryDb(List<UserInTest> users) {
        for (UserInTest userInTest : users) {
            User user = new User(userInTest.getName(), userInTest.getEmail(), userInTest.getStatus());
            usersService.createOrUpdateUser(user);
        }
    }

    @When("One asks for the list of users")
    public void oneAsksForTheListOfUsers() {
        ResponseEntity<List<User>> users = this.restTemplate.exchange(
            "http://localhost:" + port + "/users/getAllUsers", 
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<User>>() {}
        );
        this.currentUsersInDb = users.getBody();
        System.out.println(this.currentUsersInDb);
    }

    @Then("He gets the list that contains the following users")
    public void heGetsTheListThatContainsTheFollowingUsers(List<UserInTest> users) {
        assertEquals(users.size(), this.currentUsersInDb.size());
        for (UserInTest userInTest : users) {
            List<User> result = this.currentUsersInDb.stream()
                .filter(user -> user.getUserEmail().equalsIgnoreCase(userInTest.getEmail()))
                .collect(Collectors.toList());
            assertNotNull(result);
            assertFalse(result.isEmpty());
        }
    }

    @When("One tries to retrieve the user associated to email {string}")
    public void oneTriesToRetrieveTheUserAssociatedToEmailXXX(String email) {
        this.foundUser = usersService.findByUserEmail(email);
    }

    @Then("He gets the following user informations {string}")
    public void heGetsTheFollowingUserInformations(String name) {
        assertNotNull(foundUser);
        assertEquals(name, foundUser.getUsername());
    }

    @Then("He gets a 404 error")
    public void heGetsA404Error() {
        assertNull(foundUser);
    }

    @DataTableType
    public UserInTest userInTestTransformer(Map<String, String> row) {
        return new UserInTest(
            row.get("user_email"),
            row.get("user_name"),
            Boolean.parseBoolean(row.get("user_is_deleted").toLowerCase()) ? Constants.STATE_DELETED : Constants.STATE_ACTIVATED
        );
    }
}
