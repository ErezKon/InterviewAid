# 1963. Minimum Number of Swaps to Make the String Balanced

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced)
**Companies:** Adobe, Amazon, Bloomberg, Expedia, Google, Ibm, Meta, Microsoft, Microstrategy, Paypal, Servicenow, Visa, Zoho

---

## Approach: Count Unmatched — O(n) ✅

```
FUNCTION minSwaps(s):
    unmatched = 0

    FOR char IN s:
        IF char == '[':
            unmatched += 1
        ELSE:
            IF unmatched > 0:
                unmatched -= 1

    RETURN (unmatched + 1) / 2
```

After canceling all matched pairs, we have `unmatched` unmatched `[` brackets. Each swap fixes 2 pairs → answer = ceil(unmatched / 2).
