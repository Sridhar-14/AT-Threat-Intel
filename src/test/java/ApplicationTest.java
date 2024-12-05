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
        // Set path to your ChromeDriver
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");

        // Use ChromeOptions to run in headless mode (optional)
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");

        driver = new ChromeDriver(options);
        driver.get("http://localhost:5174");
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS); // Wait for elements to load
    }

    @Test
    public void testAppIsRunning() {
        // Test if the app is accessible at localhost:5174
        String currentUrl = driver.getCurrentUrl();
        Assert.assertEquals(currentUrl, "http://localhost:5174/");
    }

    @Test
    public void testDataGenerationHourly() {
        // You can check for a specific element that updates hourly (for example, last data timestamp)
        String lastDataTimestamp = driver.findElement(By.id("last-data-timestamp")).getText();

        // Assuming you can capture the timestamp of the last data update, and check for hourly updates
        // You will need to either wait or manually trigger a data update and compare with previous value.
        String expectedText = "Last data update: " + getLastHourTimestamp(); // You'll need to define `getLastHourTimestamp()`

        Assert.assertTrue(lastDataTimestamp.contains(expectedText), "Data is not updated hourly.");
    }

    @Test
    public void testAppStartsSuccessfully() {
        // Test if an essential element (e.g., login form) is present on the home page
        boolean isLoginFormVisible = driver.findElement(By.id("login-form")).isDisplayed();
        Assert.assertTrue(isLoginFormVisible, "The app did not start correctly.");
    }

    @AfterClass
    public void tearDown() {
        // Close the browser after the tests
        driver.quit();
    }

    // Helper method to get the current hour formatted (you can adjust this to your needs)
    private String getLastHourTimestamp() {
        // Return the formatted timestamp for the previous hour
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:00:00");
        java.util.Date date = new java.util.Date(System.currentTimeMillis() - 60 * 60 * 1000); // subtract 1 hour
        return sdf.format(date);
    }
}
