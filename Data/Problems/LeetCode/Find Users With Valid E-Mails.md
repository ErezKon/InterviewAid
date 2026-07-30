# 1517. Find Users With Valid E-Mails

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-users-with-valid-e-mails](https://leetcode.com/problems/find-users-withvalid-e-mails)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given a table **Users** with a column `mail`, return all rows where the email address is a valid LeetCode corporate email. A valid email starts with a letter, may contain letters, digits, dots, underscores or hyphens, and ends with `@leetcode.com`.

## Examples
| mail | Result |
|------|--------|
| `alice@leetcode.com` | ✅ |
| `bob123@leetcode.com` | ✅ |
| `1char@leetcode.com` | ❌ (starts with a digit) |
| `char@other.com` | ❌ (wrong domain) |

## Approach
Use a regular expression in the `WHERE` clause to filter rows that satisfy the required pattern.

```text
FUNCTION GetValidUsers():
    // Define regex pattern for valid email
    SET pattern ← '^[a-zA-Z][a-zA-Z0-9._-]*@leetcode\\.com$'
    // Query the Users table using the pattern
    RETURN SELECT * FROM Users WHERE mail REGEXP pattern
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Define regex `^[a-zA-Z][a-zA-Z0-9._-]*@leetcode\.com$` |
| 2 | Execute `SELECT * FROM Users WHERE mail REGEXP pattern` |
| 3 | Database returns rows whose `mail` matches the pattern |

## Complexity Analysis
- **Time:** O(N) where N is the number of rows, as each row is evaluated against the regex.
- **Space:** O(1) extra space besides the result set.

## Follow-Up Questions
- How would you modify the query to handle case‑insensitive email validation?
- How can you index the `mail` column to improve performance for large tables?
- Extend the pattern to allow subdomains like `@sub.leetcode.com`.

## Key Takeaway
A concise regular expression in the `WHERE` clause can efficiently filter rows to retrieve only valid corporate email addresses.