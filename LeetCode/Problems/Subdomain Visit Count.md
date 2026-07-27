# 811. Subdomain Visit Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subdomain-visit-count](https://leetcode.com/problems/subdomain-visit-count)
**Companies:** Google, Microsoft, Roblox, Wix

---

```
FUNCTION subdomainVisits(cpdomains):
    count = Counter()
    FOR entry IN cpdomains:
        c, domain = entry.split()
        c = int(c)
        parts = domain.split('.')
        FOR i ← 0 TO len(parts) - 1:
            count['.'.join(parts[i:])] += c
    RETURN [f"{v} {k}" for k, v in count.items()]
```
