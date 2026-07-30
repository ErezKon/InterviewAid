# 93. Restore IP Addresses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/restore-ip-addresses](https://leetcode.com/problems/restore-ip-addresses)
**Companies:** Adobe, Amazon, Arista Networks, Bloomberg, Bytedance, Goldman Sachs, Google, Hashedin, Meta, Microsoft, Motive, Nvidia, Oracle, Palo Alto Networks, Tiktok, Visa, Wells Fargo, Yahoo, Zoho

---

## Problem Description

Given a string `s` containing only digits, return all possible valid **IP addresses** that can be formed by inserting dots into `s`. Each segment must be 0-255 with no leading zeros.

**Constraints:**
- `1 <= s.length <= 20`
- `s` consists of digits only

---

## Examples

**Example 1:**
- **Input:** `s = "25525511135"`
- **Output:** `["255.255.11.135", "255.255.111.35"]`

**Example 2:**
- **Input:** `s = "0000"`
- **Output:** `["0.0.0.0"]`

**Example 3:**
- **Input:** `s = "101023"`
- **Output:** `["1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3"]`

---

## Key Insight

> Each IP has exactly 4 segments, each 1-3 digits, each 0-255, no leading zeros. Use **backtracking** with pruning — at most 3^4 = 81 branches, but pruning keeps it much smaller.

---

## Approach: Backtracking — O(1) since max 27 combinations ✅

```
FUNCTION restoreIpAddresses(s):
    result = []
    backtrack(s, 0, [], result)
    RETURN result

FUNCTION backtrack(s, start, parts, result):
    IF len(parts) == 4:
        IF start == len(s):
            result.ADD('.'.JOIN(parts))
        RETURN

    FOR length ← 1 TO 3:
        IF start + length > len(s): BREAK
        segment = s[start..start+length-1]
        IF (segment[0] == '0' AND length > 1): BREAK    // no leading zeros
        IF int(segment) > 255: BREAK
        parts.ADD(segment)
        backtrack(s, start + length, parts, result)
        parts.REMOVE_LAST()
```

---

## Walkthrough

`s = "25525511135"`

```
backtrack(0, [])
  → "2" → backtrack(1, ["2"])
    → "5" → backtrack(2, ["2","5"])
      → "5" → backtrack(3, ["2","5","5"])
        → "25511135" too long for 1 segment...
      → "52" → ...
  → "25" → backtrack(2, ["25"])
    → ...
  → "255" → backtrack(3, ["255"])
    → "255" → backtrack(6, ["255","255"])
      → "1" → backtrack(7, ["255","255","1"])
        → "1135" > 255 ✗
        → "113" → backtrack(10, ["255","255","1","113"])
          → start(10) ≠ 11 ✗
        → "11" → backtrack(9, ["255","255","1","11"])
          → start(9) ≠ 11 ✗
      → "11" → backtrack(8, ["255","255","11"])
        → "135" → backtrack(11, ["255","255","11","135"]) ✅
      → "111" → backtrack(9, ["255","255","111"])
        → "35" → backtrack(11, ["255","255","111","35"]) ✅
```

Result: `["255.255.11.135", "255.255.111.35"]` ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(1) — bounded by 3^4 = 81 combinations, pruning reduces further |
| Space  | O(1) — at most 4 segments on the recursion stack |

---

## Follow-Up Questions

1. **How does this differ from palindrome partitioning?**
   → Same backtracking template but with different validity checks (0-255 vs palindrome).

2. **Can this be done iteratively?**
   → Yes, with 3 nested loops for the 3 dot positions.

3. **What if we allow IPv6?**
   → 8 groups of 4 hex digits — same backtracking idea but different constraints.

---

## Key Takeaway

> IP address restoration is a classic **constrained backtracking** problem — the bounded input (max 12 digits, 4 segments) makes it O(1), and the key pruning rules are: no leading zeros and segment ≤ 255.
