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

We have `n` buildings numbered from `0` to `n - 1`. Each building has a number of employees. It's transfer season, and some employees want to change the building they reside in.

You are given an array `requests` where `requests[i] = [from_i, to_i]` represents an employee's request to transfer from building `from_i` to building `to_i`.

**All buildings are full**, so a list of requests is achievable only if for each building, the **net change in employee transfers is zero**. This means the number of employees **leaving** is **equal** to the number of employees **moving in**. For example if `n = 3` and two employees are leaving building `0`, one is leaving building `1`, and one is leaving building `2`, there should be two employees moving to building `0`, one employee moving to building `1`, and one employee moving to building `2`.

Return *the maximum number of achievable requests*.

**Constraints:**
- `1 <= n <= 20`
- `1 <= requests.length <= 16`
- `requests[i].length == 2`
- `0 <= from_i, to_i < n`

---

## Examples

```
Example 1:
  Input: n = 5, requests = [[0,1],[1,0],[0,1],[1,2],[2,0],[3,4]]
  Output: 5
  Explanation: Let's see the requests:
    From building 0 we have employees x and y and both want to move to building 1.
    From building 1 we have employees a and b and they want to move to buildings 2 and 0 respectively.
    From building 2 we have employee z and they want to move to building 0.
    From building 3 we have employee c and they want to move to building 4.
    From building 4 we don't have any requests.
    We can achieve the requests of users x and b by swapping their places.
    We can achieve the requests of users y, a and z by swapping the places in the 3 buildings.
```

```
Example 2:
  Input: n = 3, requests = [[0,0],[1,2],[2,1]]
  Output: 3
  Explanation: Let's see the requests:
    From building 0 we have employee x and they want to stay in the same building 0.
    From building 1 we have employee y and they want to move to building 2.
    From building 2 we have employee z and they want to move to building 1.
    We can achieve all the requests.
```

```
Example 3:
  Input: n = 4, requests = [[0,3],[3,1],[1,2],[2,0]]
  Output: 4
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
