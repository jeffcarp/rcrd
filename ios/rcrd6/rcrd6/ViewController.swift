//
//  ViewController.swift
//  rcrd6
//
//  Created by George Carpenter V on 2/21/16.
//  Copyright © 2016 Bit Carpentry. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var webView: UIWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let url = NSURL (string: "https://app.rcrd.org/");
        let requestObj = NSURLRequest(URL: url!);
        webView.loadRequest(requestObj);
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

