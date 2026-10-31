# 929. Unique Email Addresses

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/unique-email-addresses](https://leetcode.com/problems/unique-email-addresses)
**Companies:** Amazon, Google, Intuit, Wix

---

## Problem Description

Every **valid email** consists of a **local name** and a **domain name**, separated by the `'@'` sign. Besides lowercase letters, the email may contain one or more `'.'` or `'+'`.

- For example, in `"alice@leetcode.com"`, `"alice"` is the **local name**, and `"leetcode.com"` is the **domain name**.

If you add periods `'.'` between some characters in the **local name** part of an email address, mail sent there will be forwarded to the same address without dots in the local name. Note that this rule **does not apply** to **domain names**.

- For example, `"alice.z@leetcode.com"` and `"alicez@leetcode.com"` forward to the same email address.

If you add a plus `'+'` in the **local name**, everything after the first plus sign **will be ignored**. This allows certain emails to be filtered. Note that this rule **does not apply** to **domain names**.

- For example, `"m.y+name@email.com"` will be forwarded to `"my@email.com"`.

It is possible to use both of these rules at the same time.

Given an array of strings `emails` where we send one email to each `emails[i]`, return *the number of different addresses that actually receive mails*.

**Constraints:**
- `1 <= emails.length <= 100`
- `1 <= emails[i].length <= 100`
- `emails[i]` consist of lowercase English letters, `'+'`, `'.'` and `'@'`.
- Each `emails[i]` contains exactly one `'@'` character.
- All local and domain names are non-empty.
- Local names do not start with a `'+'` character.
- Domain names end with the `".com"` suffix.
- Domain names must contain at least one character before `".com"` suffix.

## Examples

**Example 1:**
```
Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.
```

**Example 2:**
```
Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
Output: 3
```

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
- **Time:** O(N · L) where N is the number of emails and L is the average length of an email.
- **Space:** O(N) for the hash set storing unique normalized emails.

## Follow-Up Questions
1. How would you handle very large input streams that cannot fit into memory?
2. Can the solution be adapted to support case-insensitive domains?
3. What if the normalization rules change (e.g., allowing certain characters)?

## Key Takeaway
Normalize each email by stripping periods and ignoring characters after a plus sign, then use a hash set to count distinct addresses.
