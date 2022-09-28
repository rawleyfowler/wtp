type player = { ip : string; score : int } [@@deriving yojson]

let database : (string, player) Hashtbl.t = Hashtbl.create 5

let save_player player =
  let is_exist = Hashtbl.find_opt database player.ip in
  let () =
    match is_exist with
    | None -> Hashtbl.add database player.ip player
    | Some t ->
        let updated_player = { t with score = t.score + player.score } in
        Hashtbl.replace database player.ip updated_player
  in
  Dream.respond ~code:204 ""

let get_all_player () =
  let value = Hashtbl.fold (fun _ v acc -> v :: acc) database [] in
  let sorted_list = List.sort (fun p1 p2 -> p1.score - p2.score) value in
  List.map player_to_yojson sorted_list

let handle_score req =
  let%lwt body = Dream.body req in
  let player = player_of_yojson @@ Yojson.Safe.from_string body in
  match player with
  | Ok p -> save_player p
  | Error _ -> Dream.respond ~code:401 ""

let () =
  Dream.run
  @@ Dream.router
       [
         Dream.scope "/api/v1" []
           [
             Dream.post "/score" handle_score;
             Dream.get "/score" (fun _ ->
                 `List (get_all_player ())
                 |> Yojson.Safe.to_string |> Dream.json);
           ];
       ]
