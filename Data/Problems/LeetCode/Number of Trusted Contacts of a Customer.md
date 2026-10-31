# 1364. Number of Trusted Contacts of a Customer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-trusted-contacts-of-a-customer](https://leetcode.com/problems/number-of-trusted-contacts-of-a-customer)
**Companies:** Roblox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Multi-Join](#2-approach)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Customers`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| customer_name | varchar |
| email         | varchar |
+---------------+---------+
customer_id is the column of unique values for this table.
Each row of this table contains the name and the email of a customer of an online shop.
```

Table: `Contacts`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | id      |
| contact_name  | varchar |
| contact_email | varchar |
+---------------+---------+
(user_id, contact_email) is the primary key (combination of columns with unique values) for this table.
Each row of this table contains the name and email of one contact of customer with user_id.
This table contains information about people each customer trust. The contact may or may not exist in the Customers table.
```

Table: `Invoices`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| invoice_id   | int     |
| price        | int     |
| user_id      | int     |
+--------------+---------+
invoice_id is the column of unique values for this table.
Each row of this table indicates that user_id has an invoice with invoice_id and a price.
```

Write a solution to find the following for each `invoice_id`:

- `customer_name`: The name of the customer the invoice is related to.
- `price`: The price of the invoice.
- `contacts_cnt`: The number of contacts related to the customer.
- `trusted_contacts_cnt`: The number of contacts related to the customer and at the same time they are customers to the shop. (i.e their email exists in the `Customers` table.)

Return the result table **ordered** by `invoice_id`.

The result format is in the following example.

---

## 2. Approach: SQL Multi-Join ✅

```sql
SELECT i.invoice_id, c.customer_name, i.price,
       COUNT(co.contact_name) AS contacts_cnt,
       COUNT(c2.customer_id) AS trusted_contacts_cnt
FROM Invoices i
JOIN Customers c ON i.user_id = c.customer_id
LEFT JOIN Contacts co ON c.customer_id = co.user_id
LEFT JOIN Customers c2 ON co.contact_email = c2.email
GROUP BY i.invoice_id
ORDER BY i.invoice_id;
```

---

## 3. Examples

**Example 1:**
```
Input:
Customers table:
+-------------+---------------+--------------------+
| customer_id | customer_name | email              |
+-------------+---------------+--------------------+
| 1           | Alice         | alice@leetcode.com |
| 2           | Bob           | bob@leetcode.com   |
| 13          | John          | john@leetcode.com  |
| 6           | Alex          | alex@leetcode.com  |
+-------------+---------------+--------------------+
Contacts table:
+-------------+--------------+--------------------+
| user_id     | contact_name | contact_email      |
+-------------+--------------+--------------------+
| 1           | Bob          | bob@leetcode.com   |
| 1           | John         | john@leetcode.com  |
| 1           | Jal          | jal@leetcode.com   |
| 2           | Omar         | omar@leetcode.com  |
| 2           | Meir         | meir@leetcode.com  |
| 6           | Alice        | alice@leetcode.com |
+-------------+--------------+--------------------+
Invoices table:
+------------+-------+---------+
| invoice_id | price | user_id |
+------------+-------+---------+
| 77         | 100   | 1       |
| 88         | 200   | 1       |
| 99         | 300   | 2       |
| 66         | 400   | 2       |
| 55         | 500   | 13      |
| 44         | 60    | 6       |
+------------+-------+---------+
Output:
+------------+---------------+-------+--------------+----------------------+
| invoice_id | customer_name | price | contacts_cnt | trusted_contacts_cnt |
+------------+---------------+-------+--------------+----------------------+
| 44         | Alex          | 60    | 1            | 1                    |
| 55         | John          | 500   | 0            | 0                    |
| 66         | Bob           | 400   | 2            | 0                    |
| 77         | Alice         | 100   | 3            | 2                    |
| 88         | Alice         | 200   | 3            | 2                    |
| 99         | Bob           | 300   | 2            | 0                    |
+------------+---------------+-------+--------------+----------------------+
Explanation:
Alice has three contacts, two of them are trusted contacts (Bob and John).
Bob has two contacts, none of them is a trusted contact.
Alex has one contact and it is a trusted contact (Alice).
John doesn't have any contacts.
```

---

## 4. Walkthrough

**Step 1 – Join invoices with customers**

```
SELECT i.invoice_id, c.customer_name, i.price
FROM Invoices i JOIN Customers c ON i.user_id = c.customer_id;
```

**Step 2 – Count all contacts per customer**

```
LEFT JOIN Contacts co ON c.customer_id = co.user_id
GROUP BY i.invoice_id
```

**Step 3 – Identify trusted contacts**

```
LEFT JOIN Customers c2 ON co.contact_email = c2.email
```

The second LEFT JOIN checks whether each contact’s email exists in the Customers table; matching rows are trusted contacts. Aggregating with `COUNT` yields the required numbers.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(N + M + K) where N is invoices, M contacts, K customers (joins) |
| **Space** | O(N) for result set |

---

## 6. Follow-Up Questions

1. How would you modify the query to list only invoices with at least one trusted contact?
2. How can you compute the percentage of trusted contacts per customer?
3. Extend the solution to handle contacts stored in a separate NoSQL store.

---

## 7. Key Takeaway

> **Double LEFT JOIN:** first join contacts to customers, then join contacts back to the customers table to verify trusted status. This pattern isolates contacts that are also customers.
