# 929. Unique Email Addresses

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/unique-email-addresses](https://leetcode.com/problems/unique-email-addresses)
**Companies:** Amazon, Google, Intuit, Wix

---

```
FUNCTION numUniqueEmails(emails):
    seen = set()
    FOR email IN emails:
        local, domain = email.SPLIT('@')
        local = local.SPLIT('+')[0].REPLACE('.', '')
        seen.ADD(local + '@' + domain)
    RETURN len(seen)
```
