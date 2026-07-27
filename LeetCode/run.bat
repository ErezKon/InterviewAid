@echo off
node c:\Code\Interview\LeetCode\test_write.js
if errorlevel 1 (
    echo NODE_FAILED > c:\Code\Interview\LeetCode\status.txt
) else (
    echo NODE_OK > c:\Code\Interview\LeetCode\status.txt
)
