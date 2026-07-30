# 2935. Maximum Strong Pair XOR II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-strong-pair-xor-ii](https://leetcode.com/problems/maximum-strong-pair-xor-ii)
**Companies:** Zscaler

---

## Problem Description
Given an array `nums` of non‑negative integers, a **strong pair** `(i, j)` satisfies `i < j` and `nums[i] & nums[j] == nums[i]`. Return the maximum possible value of `nums[i] XOR nums[j]` among all strong pairs. The array length can be up to `10⁵` and each number fits in 30 bits.

## Examples
**Example 1**
```
Input: nums = [0,1,2,3]
Output: 3
Explanation: Strong pairs are (0,1), (0,2), (0,3), (1,3), (2,3). The maximum XOR is 0 XOR 3 = 3.
```
**Example 2**
```
Input: nums = [5,1,2]
Output: 0
Explanation: No pair satisfies the strong condition, so the answer is 0.
```

## Approach
The condition means `nums[i]` is a bitwise subset of `nums[j]`. To maximise XOR we need the partner with the most differing bits while still being a subset. A **bitwise trie** (binary prefix tree) lets us query, for each number, the best possible subset partner in `O(30)` time.
1. Insert all numbers into a binary trie.
2. For each `num`, traverse the trie from the most‑significant bit to the least:
   * If the current bit of `num` is `1`, we may move to the `0` child (different bit → larger XOR) **provided** the subtree only contains numbers that are subsets of `num` (i.e., they never have a `1` where `num` has `0`).
   * Otherwise we must follow the child matching `num`'s bit.
3. Keep the maximum XOR found.
The key insight is that while walking the trie we can prune branches that would violate the subset condition.

```text
FUNCTION maxStrongPairXOR(nums):
    trie ← NEW Trie()
    FOR num IN nums:
        INSERT(trie, num)
    maxXor ← 0
    FOR num IN nums:
        partner ← QUERY_SUBSET_MAX_XOR(trie, num)
        IF partner IS NOT NULL:
            maxXor ← MAX(maxXor, num XOR partner)
    RETURN maxXor

FUNCTION INSERT(trie, num):
    node ← trie.root
    FOR bitPos ← 30 DOWNTO 0:
        bit ← (num >> bitPos) & 1
        IF node.child[bit] IS NULL:
            node.child[bit] ← NEW TrieNode()
        node ← node.child[bit]
    node.isEnd ← TRUE
    node.value ← num

FUNCTION QUERY_SUBSET_MAX_XOR(trie, num):
    node ← trie.root
    bestNode ← NULL
    FOR bitPos ← 30 DOWNTO 0:
        IF node IS NULL: BREAK
        bit ← (num >> bitPos) & 1
        // Prefer opposite bit to increase XOR, but only if that branch's numbers are subsets
        IF bit = 1 AND node.child[0] IS NOT NULL:
            node ← node.child[0]
        ELSE IF node.child[bit] IS NOT NULL:
            node ← node.child[bit]
        ELSE:
            BREAK
    IF node IS NOT NULL AND node.isEnd:
        bestNode ← node
    RETURN bestNode.value IF bestNode IS NOT NULL ELSE NULL
```

## Walkthrough
Take `nums = [0,1,2,3]`.
1. Insert all numbers into the trie.
2. For `num = 3 (011)` the query follows the `0` child at the most‑significant `1` bit, reaching the leaf `0`. XOR = 3.
3. For `num = 2 (010)` the best subset partner is `0`; XOR = 2.
4. The maximum XOR encountered is `3`.

## Complexity Analysis
*Time*: Building the trie `O(n·B)` and each query `O(B)`, where `B = 31`. Overall `O(n·B)` ≈ `O(n)`.
*Space*: Trie stores at most `n·B` nodes → `O(n·B)`.

## Follow‑Up Questions
1. How would the solution change if the strong‑pair condition were `nums[i] | nums[j] == nums[j]`?
2. Can you solve the problem without a trie, using sorting and bit‑mask checks?
3. How would you modify the algorithm to also return the indices of the optimal pair?

## Key Takeaway
A binary trie combined with the bitwise‑subset property enables an `O(n)` solution to find the maximum XOR among strong pairs.
