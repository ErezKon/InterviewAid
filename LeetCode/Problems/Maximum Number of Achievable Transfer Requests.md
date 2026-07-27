# 1601. Maximum Number of Achievable Transfer Requests

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-achievable-transfer-requests](https://leetcode.com/problems/maximum-number-of-achievable-transfer-requests)
**Companies:** Amazon

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

There are `n` buildings, and several employee transfer `requests` where `requests[i] = [from_i, to_i]` means an employee wants to transfer from building `from_i` to building `to_i`.

A set of requests is **achievable** if, after processing all requests in the set, the net change in employee count for **every building is zero** (same number of people leave as arrive).

Return the **maximum number of achievable requests**.

**Constraints:**
- `1 <= n <= 20`
- `1 <= requests.length <= 16`
- `requests[i].length == 2`

---

## Examples

**Example 1:**
```
Input:  n = 5, requests = [[0,1],[1,0],[0,1],[1,2],[2,0],[3,4]]
Output: 5
Explanation: Take requests 0,1,2,3,4: buildings have net 0 change each.
```

**Example 2:**
```
Input:  n = 3, requests = [[0,0],[1,2],[2,1]]
Output: 3
```

---

## Key Insight

> With at most **16 requests**, we can enumerate **all 2^16 subsets** (bitmask). For each subset, check if every building has net-zero change. Track the maximum subset size that satisfies the constraint.

---

## Approach

```
FUNCTION maximumRequests(n, requests)
    r ← len(requests)
    result ← 0

    FOR mask ← 0 TO 2^r - 1 DO
        balance ← array of n zeros
        count ← 0

        FOR i ← 0 TO r - 1 DO
            IF mask has bit i set THEN
                balance[requests[i][0]] ← balance[requests[i][0]] - 1
                balance[requests[i][1]] ← balance[requests[i][1]] + 1
                count ← count + 1

        IF all values in balance are 0 THEN
            result ← MAX(result, count)

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
n = 3, requests = [[0,0],[1,2],[2,1]]
```

| Mask (binary) | Requests selected | Balance     | Valid? | Count |
|---------------|------------------|-------------|--------|-------|
| 111           | all 3            | [0, 0, 0]  | ✅     | **3** |
| 110           | 1, 2             | [0, -1, 1]→wait: [0,0],[1,2] → bal=[0,-1,1] | ❌ | — |
| ...           |                  |             |        |       |

With mask=111 (all three): req[0]=[0,0] → balance unchanged. req[1]=[1,2] → bal=[0,-1,1]. req[2]=[2,1] → bal=[0,0,0]. Valid!

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(2^r × (r + n))** — enumerate all subsets, check balance |
| Space  | **O(n)** — balance array |

With `r ≤ 16`: 2^16 = 65,536 subsets — very manageable.

---

## Follow-Up Questions

1. **Can we prune the search?**
   Yes — skip masks where `popcount(mask) ≤ result` (can't beat current best). Also skip early if balance can't recover.

2. **Could backtracking be faster?**
   Backtracking with pruning might be faster in practice but has the same worst-case.

3. **What if requests were up to 30?**
   2^30 ≈ 10^9 is too much. Would need graph decomposition (find independent cycles) or meet-in-the-middle.

4. **How does this relate to finding cycles in a graph?**
   An achievable set of requests forms a union of directed cycles. The problem asks for the maximum number of edges coverable by cycles.

---

## Key Takeaway

> **Bitmask enumeration** is the go-to for problems with ≤ ~20 items and a constraint that's easy to check per subset — O(2^n) beats trying to be clever when n is small.
