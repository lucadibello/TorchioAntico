from selenium import webdriver

# Init selenium + firefox driver
driver = webdriver.Firefox("/Users/lucadibello/Documents/SeleniumDrivers")

# Open url
driver.get("http://localhost:3000/admin/login")

# Fill login form
driver.find_element_by_id("email-input").send_keys("info@lucadibello.ch")
driver.find_element_by_id("password-input").send_keys("root")

# Submit form
driver.find_element_by_css_selector("#form-content > button").click()
