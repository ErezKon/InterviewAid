# 3213. Construct String with Minimum Cost

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/construct-string-with-minimum-cost](https://leetcode.com/problems/construct-string-with-minimum-cost)
**Companies:** Mitsogo

---

## 1. Problem Description

Given a target string and an array of `words` with `costs`, find the minimum cost to construct `target` by concatenating words (each word can be used multiple times). Return -1 if impossible.

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

| target | words | costs | Output |
|--------|-------|-------|--------|
| "leetcode" | ["leet","code","leetcode"] | [1,1,5] | 2 |
| "apple" | ["app","le","p"] | [2,3,1] | 5 |
| "abcd" | ["ab","cd","abc"] | [2,2,3] | 4 |

*Explanation*: In the first example, using "leet" + "code" costs 1+1=2, cheaper than the single word "leetcode" costing 5.

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
