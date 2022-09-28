type player = { ip : string; score : int; }
val player_to_yojson : player -> Yojson.Safe.t
val player_of_yojson :
  Yojson.Safe.t -> player Ppx_deriving_yojson_runtime.error_or