# 1209. Remove All Adjacent Duplicates in String II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii)
**Companies:** Agoda, Amazon, Attentive, Bloomberg, Couchbase, Disney, Factset, Goldman Sachs, Google, Grammarly, Meta, Microsoft, Morgan Stanley, Oracle, Paypal, Salesforce, Tiktok, Walmart Labs

---

## Approach: Stack of (char, count) — O(n) ✅

```
FUNCTION removeDuplicates(s, k):
    stack = []    // [(char, count)]

    FOR char IN s:
        IF stack AND stack.TOP().char == char:
            stack.TOP().count += 1
            IF stack.TOP().count == k:
                stack.POP()
        ELSE:
            stack.PUSH((char, 1))

    RETURN JOIN(char * count for (char, count) in stack)
```

Generalizes Remove All Adjacent Duplicates (#1047) from k=2 to arbitrary k.
