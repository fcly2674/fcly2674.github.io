# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import requests


def get_html_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    return soup.prettify()


def extract_account_info(html_content):
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, "html.parser")

    # Find all the email and password elements
    account_info_elements = soup.find_all("h4")
    email_elements = soup.find_all("input", {"id": "email"})
    password_elements = soup.find_all("input", {"id": "pass"})

    # Extract all the account info values and remove extra spaces and newlines
    account_infos = [' '.join(element.text.split())
                     for element in account_info_elements]
    emails = [element["value"] for element in email_elements]
    passwords = [element["value"] for element in password_elements]

    # Combine all the account infos, emails, and passwords into a list of tuples
    account_data = list(zip(account_infos, emails, passwords))

    return account_data


def run_my_code():
    # Get the HTML content from the URL
    html_content = get_html_content(
        'https://xiaohuojian.link')
    # Extract the account info from the HTML content
    account_data = extract_account_info(html_content)
    # Create a string to send as a message
    message_to_send = ""
    for account_info, email, password in account_data:
        message_to_send += f"Account Info: {account_info}\nEmail: {email}\nPassword: {password}\n\n"
    return message_to_send


print(run_my_code())
