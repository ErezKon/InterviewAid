# 3213. Construct String with Minimum Cost

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/construct-string-with-minimum-cost](https://leetcode.com/problems/construct-string-with-minimum-cost)
**Companies:** Mitsogo

---

## 1. Problem Description

You are given a string `target`, an array of strings `words`, and an integer array `costs`, both arrays of the same length.

Imagine an empty string `s`.

You can perform the following operation any number of times (including **zero**):

- Choose an index `i` in the range `[0, words.length - 1]`.
- Append `words[i]` to `s`.
- The cost of operation is `costs[i]`.

Return the **minimum** cost to make `s` equal to `target`. If it's not possible, return `-1`.

**Constraints:**
- `1 <= target.length <= 5 * 10^4`
- `1 <= words.length == costs.length <= 5 * 10^4`
- `1 <= words[i].length <= target.length`
- The total sum of `words[i].length` is less than or equal to `5 * 10^4`.
- `target` and `words[i]` consist only of lowercase English letters.
- `1 <= costs[i] <= 10^4`

---

## 2. Key Insight

> Build an **Aho-Corasick automaton** from all words, then DP over the target string. At each position, the automaton tells which words end here, enabling O(1) transitions per match. Alternative: Trie + DP.

---

## 3. Approach: Trie + DP — O(n × L + total_word_length) ✅

```text
FUNCTION minimumCost(target, words, costs):
    // Build trie from words with associated costs (keep min cost per word)
    trie ← Trie()
    FOR i, word IN enumerate(words):
        trie.insert(word, costs[i])  // keep min cost at leaf
    
    n ← LENGTH(target)
    dp ← ARRAY[0..n] FILLED WITH INF
    dp[0] ← 0
    
    FOR i FROM 0 TO n-1:
        IF dp[i] = INF: CONTINUE
        node ← trie.root
        FOR j FROM i TO n-1:
            IF target[j] NOT IN node.children: BREAK
            node ← node.children[target[j]]
            IF node.cost ≠ INF:
                dp[j+1] ← MIN(dp[j+1], dp[i] + node.cost)
    
    RETURN dp[n] IF dp[n] ≠ INF ELSE -1
```

---

## 4. Examples

```
Example 1:
  Input: target = "abcdef", words = ["abdef","abc","d","def","ef"], costs = [100,1,1,10,5]
  Output: 7
  Explanation: The minimum cost can be achieved by performing the following operations:
    - Select index 1 and append "abc" to s at a cost of 1, resulting in s = "abc".
    - Select index 2 and append "d" to s at a cost of 1, resulting in s = "abcd".
    - Select index 4 and append "ef" to s at a cost of 5, resulting in s = "abcdef".
```
```
Example 2:
  Input: target = "aaaa", words = ["z","zz","zzz"], costs = [1,10,100]
  Output: -1
  Explanation: It is impossible to make s equal to target, so we return -1.
```

---

## 5. Walkthrough

Consider `target = "leetcode"` with `words = ["leet","code","leetcode"]` and `costs = [1,1,5]`.

1. Build a trie containing the three words with their costs.
2. Initialize `dp[0]=0`, all others = INF.
3. At position `i=0`, `dp[0]=0`. Walk the trie matching "leetcode" starting at index 0:
   - Match "leet" ending at `j=3`, update `dp[4] = min(INF, 0+1) = 1`.
   - Match "leetcode" ending at `j=7`, update `dp[8] = min(INF, 0+5) = 5`.
4. At position `i=4`, `dp[4]=1`. Continue matching from index 4:
   - Match "code" ending at `j=7`, update `dp[8] = min(5, 1+1) = 2`.
5. Final `dp[8]=2` is the minimum cost.

---

## 6. Complexity Analysis

- **Time:** O(n × L + total_word_length) where `n` is target length and `L` is the maximum word length (trie walk per start position).
- **Space:** O(total_word_length + n) for the trie and DP array.

---

## 7. Follow-Up Questions

- How would you modify the solution if each word could be used at most once?
- Can you adapt the algorithm to return the actual sequence of words used?
- What changes are needed if the cost of a word depends on its position in the target?

---

## Key Takeaway

> Word‑break with costs: Trie enables efficient prefix matching at each position. Aho‑Corasick further optimizes by avoiding redundant trie walks across positions.
