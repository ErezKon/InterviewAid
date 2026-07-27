# Word Break Pattern Collection

Related: #139 Word Break, #140 Word Break II, #472 Concatenated Words

---

## Word Break I (#139) — Can we segment?

```
dp[i] = true if s[0..i-1] can be segmented
dp[0] = true
FOR i ← 1 TO n:
    FOR j ← 0 TO i - 1:
        IF dp[j] AND s[j..i-1] IN wordDict:
            dp[i] = true; BREAK
```

## Word Break II (#140) — All segmentations

Backtracking with memoization:
```
FUNCTION wordBreak(s, wordDict):
    memo = {}
    RETURN backtrack(s, 0, wordDict, memo)
```

## Concatenated Words (#472)

Sort by length. For each word, check if it can be formed by shorter words already in the dictionary (reuse Word Break I).
