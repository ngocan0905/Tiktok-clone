<?php

namespace App\Http\Controllers\Api;

use App\Models\Like;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['post_id'=>'required']);

        try {
            $like = new Like;

            $like->user_id = auth()->user()->id;
            $like->post_id = $request->input('post_id');
            $like->save();

            return response()->json([
                'like'=>[
                    'id'=>$like->id,
                    'post_id'=>$like->post_id,
                    'user_id'=>$like->user_id
                ],
                'success'=>'OK'
            ],200);
        } catch (\Exception $e) {
            return response()->json(['error'=>$e->getMessage()],400);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $like = Like::find($id);
            if(count(collect($id))>0){
                $like->delete();
            }
            return response()->json([
                'like'=>[
                    'id'=>$like->id,
                    'post_id'=>$like->post_id,
                    'user_id'=>$like->user_id
                ],
                'success'=>'OK'
            ],200);
        } catch (\Exception $e) {
            return response()->json(['error'=>$e->getMessage()],400);
        }
    }
}