import Control.Monad
import Data.List

main :: IO ()
main =
  let mul3 (a, b, c) = a * b * c
   in do
        text <- readFile "day01/input.txt"
        let solutions = map mul3 $ findTriples $ map read $ words text
        forM_ solutions print

findTriples :: [Integer] -> [(Integer, Integer, Integer)]
findTriples list =
  [ (a, b, c)
    | (i, a) <- withIndex list,
      (j, b) <- withIndex $ drop i list,
      c <- drop j list,
      a + b + c == 2020
  ]

withIndex :: [b] -> [(Int, b)]
withIndex list =
  let fn a b = (a + 1, (a, b))
   in snd $ mapAccumL fn 0 list
