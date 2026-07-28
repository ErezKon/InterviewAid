# 1310. XOR Queries of a Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/xor-queries-of-a-subarray](https://leetcode.com/problems/xor-queries-of-a-subarray)
**Companies:** Airtel, Amazon, Bloomberg, Google

---

## Problem Description
Given an integer array `arr` and a list of queries where each query is a pair `[l, r]`, return the XOR of the subarray `arr[l..r]` for each query. Constraints typically include `1 <= arr.length, queries.length <= 10^5` and `0 <= arr[i] <= 10^9`.

## Examples
**Example 1**
```
Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3]]
Output: [2,7,14]
Explanation:
- XOR of arr[0..1] = 1 ^ 3 = 2
- XOR of arr[1..2] = 3 ^ 4 = 7
- XOR of arr[0..3] = 1 ^ 3 ^ 4 ^ 8 = 14
```

**Example 2**
```
Input: arr = [2,5,6,2], queries = [[0,2],[2,3]]
Output: [1,4]
```

## Approach
Use a **prefix XOR** array where `prefix[i]` stores XOR of `arr[0..i-1]`. The XOR of any subarray `[l, r]` is `prefix[r+1] ^ prefix[l]`. This allows answering each query in O(1) after an O(n) preprocessing step.

```text
FUNCTION xorQueries(arr, queries):
    // Build prefix XOR
    SET prefix ← [0]
    FOR num IN arr:
        SET last ← prefix[-1]
        APPEND (last ^ num) TO prefix
    // Answer queries
    SET results ← []
    FOR each (l, r) IN queries:
        SET ans ← prefix[r + 1] ^ prefix[l]
        APPEND ans TO results
    RETURN results
```

## Walkthrough
| Step | Action | prefix after step |
|------|--------|-------------------|
| Init | prefix = [0] | [0] |
| Add 1 | prefix.append(0 ^ 1) | [0,1] |
| Add 3 | prefix.append(1 ^ 3) | [0,1,2] |
| Add 4 | prefix.append(2 ^ 4) | [0,1,2,6] |
| Add 8 | prefix.append(6 ^ 8) | [0,1,2,6,14] |

Query `[1,2]`: result = prefix[3] ^ prefix[1] = 6 ^ 1 = 7.

## Complexity Analysis
- **Time:** O(n + q) where `n` is length of `arr` and `q` is number of queries.
- **Space:** O(n) for the prefix array.

## Follow-Up Questions
1. How would you handle updates to `arr` (e.g., changing an element) while still answering queries efficiently?
2. Can you extend this to support range XOR queries in a mutable array using a segment tree or binary indexed tree?
3. What if the queries ask for the maximum XOR subarray within a range?

## Key Takeaway
A prefix XOR array transforms each subarray XOR query into a constant‑time operation, turning an O(n·q) problem into O(n+q).
