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

For each invoice, find the customer name, price, number of contacts, and number of trusted contacts (contacts who are also customers).

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

| Invoices | Customers | Contacts | Output |
|----------|-----------|----------|--------|
| (1, 100, 10) | (10, 'Alice') | (10, 'bob@example.com'), (10, 'alice@example.com') | customer_name: Alice, price: 100, contacts_cnt: 2, trusted_contacts_cnt: 1 |
| (2, 200, 20) | (20, 'Bob') | (20, 'carol@example.com') | customer_name: Bob, price: 200, contacts_cnt: 1, trusted_contacts_cnt: 0 |

*Explanation*: In the first invoice, Alice has two contacts, but only one (alice@example.com) matches a customer, so trusted_contacts_cnt is 1.

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
| **Time** | O(N + M + K) where N is invoices, M contacts, K customers (joins) |
| **Space** | O(N) for result set |

---

## 6. Follow-Up Questions

1. How would you modify the query to list only invoices with at least one trusted contact?
2. How can you compute the percentage of trusted contacts per customer?
3. Extend the solution to handle contacts stored in a separate NoSQL store.

---

## 7. Key Takeaway

> **Double LEFT JOIN:** first join contacts to customers, then join contacts back to the customers table to verify trusted status. This pattern isolates contacts that are also customers.
