import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.openqa.selenium.By;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.AfterClass;
import org.testng.annotations.Test;

import java.util.concurrent.TimeUnit;

public class ApplicationTest {
    WebDriver driver;

    @BeforeClass
    public void setup() {
        // Set path to your ChromeDriver executable
        System.setProperty("webdriver.chrome.driver", "C:\\path\\to\\chromedriver.exe");

        // Use ChromeOptions to run in headless mode (optional)
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Optional, remove if you want a visible browser

        // Initialize the ChromeDriver with options
        driver = new ChromeDriver(options);

        // Launch the application
        driver.get("http://localhost:5174");

        // Set implicit wait to handle dynamic loading elements
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }

    @Test
    public void testAppIsRunning() {
        // Verify if the application URL is correct
        String currentUrl = driver.getCurrentUrl();
        Assert.assertEquals(currentUrl, "http://localhost:5174/", "App URL is not correct.");
    }

    @Test
    public void testDataGenerationHourly() {
        // Check for a specific element (e.g., timestamp) that updates hourly
        String lastDataTimestamp = driver.findElement(By.id("last-data-timestamp")).getText();

        // Format the expected timestamp to match the application's update frequency
        String expectedText = "Last data update: " + getLastHourTimestamp();

        Assert.assertTrue(lastDataTimestamp.contains(expectedText), "Data is not updated hourly.");
    }

    @Test
    public void testAppStartsSuccessfully() {
        // Verify if the login form is visible on the page
        boolean isLoginFormVisible = driver.findElement(By.id("login-form")).isDisplayed();
        Assert.assertTrue(isLoginFormVisible, "Login form is not visible. The app may not have started correctly.");
    }

    @AfterClass
    public void tearDown() {
        // Quit the browser after tests
        if (driver != null) {
            driver.quit();
        }
    }

    // Helper method to get the previous hour timestamp in the required format
    private String getLastHourTimestamp() {
        // Format the timestamp as "yyyy-MM-dd HH:00:00"
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:00:00");
        java.util.Date date = new java.util.Date(System.currentTimeMillis() - 60 * 60 * 1000); // Subtract 1 hour
        return sdf.format(date);
    }
}
