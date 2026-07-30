# 2484. Count Palindromic Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-palindromic-subsequences](https://leetcode.com/problems/count-palindromic-subsequences)
**Companies:** Amazon, Atlassian, Citadel, Dialpad, Goldman Sachs, Google, Microsoft, Millennium, Phonepe, Salesforce, Uber, Visa

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s` of digits, return the number of **palindromic subsequences** of length 5. A subsequence is palindromic if it reads the same forwards and backwards. Return the answer modulo `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` consists of digits `'0'` to `'9'`

---

## Examples

**Example 1:**
- **Input:** `s = "103301"`
- **Output:** `2`
- **Explanation:** Two palindromic subsequences of length 5: "10301" and "13031".

**Example 2:**
- **Input:** `s = "0000000"`
- **Output:** `21`
- **Explanation:** C(7,5) = 21 ways to choose 5 zeros → all form "00000".

---

## Key Insight

A length-5 palindrome has the pattern `ab?ba` — the first and fifth characters match, the second and fourth match, and the middle can be anything. For each pair `(a, b)`, count:
- **Prefix:** how many "ab" subsequences exist ending before position `mid`
- **Suffix:** how many "ba" subsequences exist starting after position `mid`

Multiply these for each middle position, and sum over all 100 digit pairs.

---

## Approach: DP on Prefix/Suffix — O(100·n) ✅

```
FUNCTION countPalindromes(s):
    MOD = 10^9 + 7
    // For each pair (a,b), count prefix occurrences of "ab" and suffix of "ba"
    // Middle character can be anything

    total = 0
    FOR a ← '0' TO '9':
        FOR b ← '0' TO '9':
            // Count "ab" prefixes and "ba" suffixes
            prefixAB = array of cumulative counts of "ab" at each position
            suffixBA = array of cumulative counts of "ba" from each position
            FOR mid ← 2 TO n - 3:
                total += prefixAB[mid-1] * suffixBA[mid+1]
                total %= MOD

    RETURN total
```

**Building prefixAB:** Scan left-to-right. Track count of `a` seen so far. When you see `b`, add the count of `a` to the running "ab" count.

**Building suffixBA:** Scan right-to-left. Track count of `a` seen so far. When you see `b`, add the count of `a` to the running "ba" count.

---

## Walkthrough

**Input:** `s = "103301"`

For pair `(a=1, b=0)` — pattern "10?01":
```
prefixAB ("10" subsequences):
  pos 0: s[0]='1', count_1=1, ab_count=0
  pos 1: s[1]='0', count_1=1, ab_count=1  → prefix[1]=1
  pos 2: s[2]='3', ab_count=1             → prefix[2]=1
  pos 3: s[3]='3', ab_count=1             → prefix[3]=1
  pos 4: s[4]='0', count_1=1, ab_count=2  → prefix[4]=2
  pos 5: s[5]='1', count_1=2, ab_count=2  → prefix[5]=2

suffixBA ("01" subsequences from right):
  pos 5: s[5]='1', count_1=1, ba_count=0
  pos 4: s[4]='0', count_1=1, ba_count=1  → suffix[4]=1
  pos 3: s[3]='3', ba_count=1             → suffix[3]=1
  pos 2: s[2]='3', ba_count=1             → suffix[2]=1
  ...

mid=2: prefix[1] × suffix[3] = 1 × 1 = 1  ("10301")
mid=3: prefix[2] × suffix[4] = 1 × 1 = 1  ("10301" again? No — "13031" via different indices)
```

Total across all pairs = **2** ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(100 × n) = O(n) — 10×10 digit pairs, each scanned in O(n) |
| **Space** | O(n) — for prefix/suffix arrays |

---

## Follow-Up Questions

**Q1: Why enumerate all 100 pairs instead of using general DP?**
It's simpler and equally efficient. A general length-5 palindrome DP would have more complex state transitions but the same asymptotic complexity.

**Q2: Can this be extended to palindromic subsequences of length k?**
For odd k, the pattern has (k-1)/2 pairs to match plus a free middle. The prefix/suffix technique extends but with nested pair counting (e.g., "abc?cba" needs prefix "abc" and suffix "cba" counts).

**Q3: Why is the middle character free?**
In a 5-char palindrome `p1p2p3p4p5`, we need `p1=p5` and `p2=p4`. `p3` has no mirror partner, so it can be any digit.

**Q4: How does this differ from LeetCode #730 (Count Different Palindromic Subsequences)?**
#730 counts distinct palindromic subsequences of any length. It uses interval DP on the full string. This problem fixes length=5 and counts all (not necessarily distinct) subsequences.

---

## Key Takeaway

> **For fixed-length palindromic subsequence counting, decompose into prefix pair counts × suffix pair counts for each possible outer pair. The middle character acts as a free pivot. This turns an exponential problem into O(alphabet² × n).**
