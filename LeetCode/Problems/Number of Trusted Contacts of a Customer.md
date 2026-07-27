# 1364. Number of Trusted Contacts of a Customer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-trusted-contacts-of-a-customer](https://leetcode.com/problems/number-of-trusted-contacts-of-a-customer)
**Companies:** Roblox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Multi-Join](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

For each invoice, find the customer name, price, number of contacts, and number of trusted contacts (contacts who are also customers).

---

## 2. Approach: SQL Multi-Join ✅

```
SELECT i.invoice_id, c.customer_name, i.price,
       COUNT(co.contact_name) AS contacts_cnt,
       COUNT(c2.customer_id) AS trusted_contacts_cnt
FROM Invoices i
JOIN Customers c ON i.user_id = c.customer_id
LEFT JOIN Contacts co ON c.customer_id = co.user_id
LEFT JOIN Customers c2 ON co.contact_email = c2.email
GROUP BY i.invoice_id
ORDER BY i.invoice_id
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · m) with joins |
| **Space** | O(n) |

---

## 4. Key Takeaway

> **Double LEFT JOIN: contacts then verify against customers.** A trusted contact is one whose email matches an existing customer.
