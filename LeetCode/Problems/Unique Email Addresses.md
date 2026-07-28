# 929. Unique Email Addresses

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/unique-email-addresses](https://leetcode.com/problems/unique-email-addresses)
**Companies:** Amazon, Google, Intuit, Wix

---

## Problem Description
Given a list of email addresses, each address consists of a local name and a domain name separated by '`@`'. In the local name, periods `'.'` are ignored and any characters after a plus sign `'+'` are ignored. Return the number of unique email addresses after applying these rules.

## Examples
**Example 1:**
Input: `["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]`
Output: `2`
Explanation: After normalization the first two become `testemail@leetcode.com` and the third becomes `testemail@lee.tcode.com`.

**Example 2:**
Input: `["a@b.com","a+foo@b.com","a.b@b.com"]`
Output: `1`
Explanation: All normalize to `a@b.com`.

## Approach
Use a hash set to store the normalized form of each email. For each email, split into local and domain, remove everything after '`+`' in the local part, delete all `'.'` characters, then recombine and insert into the set.

```text
FUNCTION normalizeAndCount(emails):
    SET unique ← EMPTY SET
    FOR email IN emails:
        SET local, domain ← SPLIT(email, '@')
        SET local ← SPLIT(local, '+')[0]
        SET local ← REPLACE_ALL(local, '.', '')
        SET normalized ← CONCAT(local, '@', domain)
        ADD normalized TO unique
    RETURN SIZE(unique)
```

## Walkthrough
| Step | Email | Local (raw) | Local (trimmed) | Local (dots removed) | Normalized |
|------|-------|-------------|-----------------|----------------------|------------|
| 1 | `test.email+alex@leetcode.com` | `test.email+alex` | `test.email` | `testemail` | `testemail@leetcode.com` |
| 2 | `test.e.mail+bob.cathy@leetcode.com` | `test.e.mail+bob.cathy` | `test.e.mail` | `testemail` | `testemail@leetcode.com` |
| 3 | `testemail+david@lee.tcode.com` | `testemail+david` | `testemail` | `testemail` | `testemail@lee.tcode.com` |

## Complexity Analysis
- **Time:** O(N · L) where N is the number of emails and L is the average length of an email.
- **Space:** O(N) for the hash set storing unique normalized emails.

## Follow-Up Questions
1. How would you handle very large input streams that cannot fit into memory?
2. Can the solution be adapted to support case‑insensitive domains?
3. What if the normalization rules change (e.g., allowing certain characters)?

## Key Takeaway
Normalize each email by stripping periods and ignoring characters after a plus sign, then use a hash set to count distinct addresses.
